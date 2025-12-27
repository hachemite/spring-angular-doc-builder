package com.docugen.service;

import com.docugen.dto.AiTemplateResponse;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class AiTemplateService {

    @Value("${groq.api.key}")
    private String apiKey;

    @Value("${groq.api.url}")
    private String apiUrl;

    @Value("${groq.api.model}")
    private String modelName;

    private final WebClient.Builder webClientBuilder;
    private final ObjectMapper objectMapper;

    // We give the AI your exact example so it mimics the style and variable naming convention
    private static final String SYSTEM_PROMPT = """
            You are an expert Document Template Architect.
            Your goal is to generate professional, CSS-styled HTML templates compatible with Thymeleaf.
            
            ### CRITICAL RULES:
            1. **Variable Names:** MUST be descriptive snake_case (e.g., recipient_name, course_title, effective_date). NEVER use empty names or generic names like 'var1'.
            2. **HTML Structure:** Use a container 'frame' div for borders/padding. Use inline CSS or a <style> block in <head>.
            3. **Thymeleaf Syntax:** Use <span th:text="${variable_name}">[Placeholder]</span> for dynamic text.
            4. **Fields Matching:** Every ${variable} in the HTML MUST have a corresponding entry in the 'fields' JSON array.
            
            ### EXAMPLE OF EXCELLENT OUTPUT (Mimic this style):
            User: "Create a certificate of appreciation"
            Output JSON:
            {
              "templateName": "Certificate of Appreciation",
              "description": "A gold-bordered award for employees.",
              "htmlContent": "<!DOCTYPE html><html xmlns:th='http://www.thymeleaf.org'><head><style>body{font-family:serif;}.frame{border:10px solid #1e3a8a;padding:20px;}</style></head><body><div class='frame'><h1 style='color:#d97706'>Certificate</h1><p>Presented to <span th:text='${recipient_name}'>[Name]</span></p></div></body></html>",
              "fields": [
                { "label": "Recipient Name", "variableName": "recipient_name", "type": "TEXT", "options": null }
              ]
            }

            ### OUTPUT FORMAT (Strict JSON, No Markdown):
            {
              "templateName": "string",
              "description": "string",
              "htmlContent": "string (The full HTML document string)",
              "fields": [
                {
                  "label": "string (Human readable label)",
                  "variableName": "string (snake_case, matching HTML)",
                  "type": "TEXT|NUMBER|DATE|SELECT|CHECKBOX|SIGNATURE",
                  "options": "string (comma-separated for SELECT, else null)"
                }
              ]
            }
            """;

    public AiTemplateResponse generateTemplate(String userDescription) {
        log.info("🤖 Generating template with model: {}", modelName);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", modelName);
        requestBody.put("messages", List.of(
                Map.of("role", "system", "content", SYSTEM_PROMPT),
                // We append a reminder to the user prompt to enforce quality
                Map.of("role", "user", "content", "Create a professional document template for: " + userDescription + ". Ensure variable names are descriptive and not empty.")
        ));
        requestBody.put("temperature", 0.5); // Lower temp for more deterministic structure
        requestBody.put("max_tokens", 4000); // Allow larger HTML responses
        requestBody.put("response_format", Map.of("type", "json_object"));

        try {
            log.info("📤 Sending request to Groq API...");

            String rawJson = webClientBuilder.build()
                    .post()
                    .uri(apiUrl)
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + apiKey)
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(requestBody)
                    .retrieve()
                    .onStatus(
                            status -> status.is4xxClientError() || status.is5xxServerError(),
                            response -> response.bodyToMono(String.class)
                                    .map(body -> {
                                        log.error("❌ Groq API Error Body: {}", body);
                                        return new RuntimeException("Groq API error (" + response.statusCode() + "): " + body);
                                    })
                    )
                    .bodyToMono(String.class)
                    .block();

            log.info("✅ Received response from Groq API");

            var rootNode = objectMapper.readTree(rawJson);
            String content = rootNode.path("choices")
                    .get(0)
                    .path("message")
                    .path("content")
                    .asText();

            return objectMapper.readValue(content, AiTemplateResponse.class);

        } catch (JsonProcessingException e) {
            log.error("❌ Failed to parse AI response JSON", e);
            throw new RuntimeException("Failed to parse AI response: " + e.getMessage());
        } catch (Exception e) {
            log.error("❌ AI Generation failed", e);
            throw new RuntimeException(e.getMessage());
        }
    }
}
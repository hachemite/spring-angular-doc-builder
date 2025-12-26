package com.docugen.service;

import com.docugen.entity.DocumentTemplate;
import com.docugen.repository.DocumentTemplateRepository;
import com.lowagie.text.DocumentException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import org.xhtmlrenderer.pdf.ITextRenderer;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class DynamicPdfService {

    private final DocumentTemplateRepository templateRepository;
    private final TemplateEngine stringTemplateEngine; // Inject our custom engine

    public byte[] generatePdf(Long templateId, Map<String, Object> userData) throws IOException, DocumentException {
        // 1. Fetch Template
        DocumentTemplate template = templateRepository.findById(templateId)
                .orElseThrow(() -> new RuntimeException("Template not found"));

        // 2. Pre-process Data (Handle Signatures)
        processSignatures(userData);

        // 3. Prepare Context
        Context context = new Context();
        context.setVariables(userData);

        // 4. Render HTML String (Replace placeholders)
        // We use the raw HTML content from the DB as the "template"
        String processedHtml = stringTemplateEngine.process(template.getContentHtml(), context);

        // 5. Convert to PDF
        return renderHtmlToPdf(processedHtml);
    }

    private byte[] renderHtmlToPdf(String html) throws IOException, DocumentException {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        ITextRenderer renderer = new ITextRenderer();

        // Ensure the HTML is valid XML (required by OpenPDF/FlyingSaucer)
        // In a production app, you might use Jsoup to clean/fix the HTML first
        renderer.setDocumentFromString(html);
        renderer.layout();
        renderer.createPDF(outputStream);

        return outputStream.toByteArray();
    }

    /**
     * Scans the user data for Base64 signature images.
     * If found, wraps them in an <img> tag so the PDF renderer displays them.
     */
    private void processSignatures(Map<String, Object> data) {
        for (Map.Entry<String, Object> entry : data.entrySet()) {
            Object value = entry.getValue();
            if (value instanceof String && isBase64Image((String) value)) {
                // Transform raw Base64 string into an HTML img tag
                String htmlImg = String.format("<img src='%s' width='150' height='50' />", value);
                data.put(entry.getKey(), htmlImg);
            }
        }
    }

    private boolean isBase64Image(String value) {
        return value.startsWith("data:image/");
    }
}
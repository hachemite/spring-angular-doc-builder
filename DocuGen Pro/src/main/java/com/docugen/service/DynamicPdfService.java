package com.docugen.service;

import com.docugen.entity.DocumentTemplate;
import com.docugen.repository.DocumentTemplateRepository;
import com.lowagie.text.DocumentException;
import lombok.RequiredArgsConstructor;
import org.jsoup.Jsoup; // Import Jsoup
import org.jsoup.nodes.Document; // Import Document
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
    private final TemplateEngine stringTemplateEngine;

    public byte[] generatePdf(Long templateId, Map<String, Object> userData) throws IOException, DocumentException {
        // 1. Fetch Template
        DocumentTemplate template = templateRepository.findById(templateId)
                .orElseThrow(() -> new RuntimeException("Template not found"));

        // 2. Pre-process Data
        processSignatures(userData);

        // 3. Prepare Context
        Context context = new Context();
        context.setVariables(userData);

        // 4. Render HTML String
        String rawHtml = stringTemplateEngine.process(template.getContentHtml(), context);

        // 5. CLEANUP: Fix HTML errors (This is the critical fix)
        String validXhtml = convertToXhtml(rawHtml);

        // 6. Convert to PDF
        return renderHtmlToPdf(validXhtml);
    }

    private String convertToXhtml(String html) {
        Document document = Jsoup.parse(html);
        document.outputSettings().syntax(Document.OutputSettings.Syntax.xml);
        document.outputSettings().charset("UTF-8");
        return document.html();
    }

    private byte[] renderHtmlToPdf(String html) throws IOException, DocumentException {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        ITextRenderer renderer = new ITextRenderer();
        renderer.setDocumentFromString(html);
        renderer.layout();
        renderer.createPDF(outputStream);
        return outputStream.toByteArray();
    }

    private void processSignatures(Map<String, Object> data) {
        for (Map.Entry<String, Object> entry : data.entrySet()) {
            Object value = entry.getValue();
            if (value instanceof String && isBase64Image((String) value)) {
                String htmlImg = String.format("<img src='%s' width='150' height='50' />", value); // Jsoup will fix this to <img />
                data.put(entry.getKey(), htmlImg);
            }
        }
    }

    private boolean isBase64Image(String value) {
        return value.startsWith("data:image/");
    }
}
package com.docugen.service;

import com.lowagie.text.DocumentException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import org.xhtmlrenderer.pdf.ITextRenderer;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

@Service
public class PdfService {

    @Autowired
    private TemplateEngine templateEngine;

    public byte[] generatePdf(String templateName, Context context) throws DocumentException, IOException {
        // 1. Render HTML from Thymeleaf template
        String htmlContent = templateEngine.process(templateName, context);

        // 2. Create PDF from HTML using Flying Saucer (OpenPDF backend)
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        ITextRenderer renderer = new ITextRenderer();

        // Ensure the HTML is parsed correctly
        renderer.setDocumentFromString(htmlContent);
        renderer.layout();
        renderer.createPDF(outputStream);

        return outputStream.toByteArray();
    }
}
package com.docugen.service;

import com.lowagie.text.DocumentException;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
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
        // 1. Render raw HTML from Thymeleaf
        String rawHtml = templateEngine.process(templateName, context);

        // 2. CLEANUP: Convert loose HTML to valid XHTML using Jsoup
        // This fixes errors like "Element type 'br' must be terminated by the matching end-tag"
        String validXhtml = convertToXhtml(rawHtml);

        // 3. Create PDF
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        ITextRenderer renderer = new ITextRenderer();

        renderer.setDocumentFromString(validXhtml);
        renderer.layout();
        renderer.createPDF(outputStream);

        return outputStream.toByteArray();
    }

    private String convertToXhtml(String html) {
        // Parse the HTML
        Document document = Jsoup.parse(html);

        // Set the syntax to XML (this forces closing tags like <br/>, <img/>)
        document.outputSettings().syntax(Document.OutputSettings.Syntax.xml);

        // Force UTF-8 encoding
        document.outputSettings().charset("UTF-8");

        return document.html();
    }
}
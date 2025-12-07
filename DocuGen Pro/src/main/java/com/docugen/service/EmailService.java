package com.docugen.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    @Async
    public void sendEmailWithAttachment(String to, String subject, String body, byte[] pdfBytes, String filename) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            // multipart = true for attachments
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(body);

            // Add Attachment
            helper.addAttachment(filename, new ByteArrayResource(pdfBytes));

            mailSender.send(message);
        } catch (MessagingException e) {
            // Log error in real app
            throw new RuntimeException("Failed to send email", e);
        }
    }
}
package com.Project.BookMyMeal.Service;

import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.util.Map;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendEmailWithTemplate(String toEmail, String subject, Map<String, String> placeholders) throws Exception {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo(toEmail);
        helper.setSubject(subject);

        // Load HTML template for confirmation from classpath
        ClassPathResource templateResource = new ClassPathResource(subject.equals("Meal Booking Confirmation") ? "templates/MealConfirmMail.html" : "templates/MealCancelMail.html");
        String htmlContent = new String(templateResource.getInputStream().readAllBytes(), StandardCharsets.UTF_8);

        // Replace placeholders
        for (Map.Entry<String, String> entry : placeholders.entrySet()) {
            htmlContent = htmlContent.replace("{{" + entry.getKey() + "}}", entry.getValue());
        }

        helper.setText(htmlContent, true);

        // Attach inline image from classpath
        ClassPathResource logoResource = new ClassPathResource("static/MealLogo.jpg");
        helper.addInline("logoImage", logoResource);

        mailSender.send(message);
    }
}

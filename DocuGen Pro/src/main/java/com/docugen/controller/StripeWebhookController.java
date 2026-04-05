package com.docugen.controller;

import com.docugen.model.SubscriptionTier;
import com.docugen.repository.UserRepository;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.model.Event;
import com.stripe.model.EventDataObjectDeserializer;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments/webhook")
public class StripeWebhookController {

    @Value("${stripe.webhook.secret}")
    private String endpointSecret;

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public ResponseEntity<String> handleStripeEvent(
            @RequestBody String payload,
            @RequestHeader("Stripe-Signature") String sigHeader) {

        System.out.println("🚨🚨🚨 WEBHOOK RECEIVED FROM STRIPE 🚨🚨🚨");

        try {
            Event event = Webhook.constructEvent(payload, sigHeader, endpointSecret);
            System.out.println("📦 Event Type: " + event.getType()); // <-- Prints exactly what Stripe sent

            if ("checkout.session.completed".equals(event.getType())) {
                EventDataObjectDeserializer dataObjectDeserializer = event.getDataObjectDeserializer();

                // ✅ FIX: Force Java to read the object, even if the dictionary versions don't perfectly match
                Session session = (Session) dataObjectDeserializer.deserializeUnsafe();

                if (session != null) {
                    String tempEmail = session.getCustomerEmail();
                    if (tempEmail == null && session.getCustomerDetails() != null) {
                        tempEmail = session.getCustomerDetails().getEmail();
                    }

                    final String customerEmail = tempEmail;

                    System.out.println("👤 Customer Email found: " + customerEmail);

                    if (customerEmail != null) {
                        // Look up the user and upgrade them!
                        userRepository.findByEmail(customerEmail).ifPresentOrElse(user -> {
                            user.setTier(SubscriptionTier.PRO);
                            user.setStripeCustomerId(session.getCustomer());
                            userRepository.save(user);
                            System.out.println("✅ SUCCESS: User " + customerEmail + " upgraded to PRO in database!");
                        }, () -> {
                            System.out.println("❌ ERROR: Could not find user in DB with email: " + customerEmail);
                        });
                    } else {
                        System.out.println("❌ ERROR: customerEmail was null in the Stripe Session!");
                    }
                } else {
                    System.out.println("❌ ERROR: Failed to deserialize session object!");
                }
            }
            return ResponseEntity.ok().build();

        } catch (SignatureVerificationException e) {
            System.err.println("⚠️ WARNING: Invalid Stripe webhook signature detected.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid signature");
        } catch (Exception e) {
            System.err.println("🔥 FATAL WEBHOOK ERROR:");
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
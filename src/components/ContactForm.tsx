"use client";

import React, { useState } from "react";
import { Flex, Button, Input, Textarea, Heading, Text, Column } from "@once-ui-system/core";

export const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        description: ""
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus("success");
                setFormData({ name: "", email: "", description: "" });
            } else {
                setStatus("error");
            }
        } catch (error) {
            setStatus("error");
        }
    };

    return (
        <Column fillWidth horizontal="center" gap="l" maxWidth="s">
            <Heading variant="display-default-s">Get in Touch</Heading>
            <Text variant="heading-default-s" align="center" style={{ lineHeight: "1.5" }}>
              For work opportunities, collaborations or other inquiries, please complete the form below.
            </Text>
            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                <Flex direction="column" gap="20">
                    <Input
                        label="Name*"
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                    <Input
                        label="Email*"
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />
                    <Textarea
                        label="Message*"
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        required
                    />
                    <Button 
                        fillWidth 
                        variant="primary" 
                        type="submit"
                        loading={status === "loading"}
                    >
                        Send
                    </Button>
                    {status === "success" && (
                        <Text variant="body-default-s" onBackground="success-strong">
                            Message sent successfully!
                        </Text>
                    )}
                </Flex>
            </form>
        </Column>
    );
};

package com.reset.spring_backend.api.controller;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Permite requisições de qualquer origem
        registry.addMapping("/**") // Todos os endpoints
                .allowedOrigins("http://localhost:5173") // Seu frontend (ajuste a URL conforme necessário)
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Métodos permitidos
                .allowedHeaders("*") // Todos os headers
                .allowCredentials(true); // Permite enviar cookies
    }
}

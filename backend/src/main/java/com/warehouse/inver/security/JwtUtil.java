package com.warehouse.inver.security;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {
    private final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256); //Zmien na zmienna srodowiskowa pozniej

    public String generateToken(String username) {
        String token = Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
        System.out.println("Wygenerowano token: " + token);
        return token;
    }

    public String extractUsername(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean validateToken(String token)  {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            //System.out.println("Token jest poprawny.");
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            System.out.println("Błąd walidacji tokena: " + e.getMessage());
            return false;
        }
    }
}

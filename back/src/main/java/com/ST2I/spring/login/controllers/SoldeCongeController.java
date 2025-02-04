package com.ST2I.spring.login.controllers;

import com.ST2I.spring.login.Services.SoldeCongeService;
import com.ST2I.spring.login.models.DTOs.SoldeCongeRequest;
import com.ST2I.spring.login.models.DTOs.SoldeCongeResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/solde-conge")
public class SoldeCongeController {

    @Autowired
    private SoldeCongeService soldeCongeService;

    // Create a new SoldeConge record
    @PostMapping
    public ResponseEntity<?> createSoldeConge(@RequestBody SoldeCongeRequest soldeCongeRequest) {
        try {
            SoldeCongeResponse soldeCongeResponse = soldeCongeService.createSoldeConge(soldeCongeRequest);
            return ResponseEntity.ok(soldeCongeResponse);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }

    // Update an existing SoldeConge record
    @PutMapping("/{id}")
    public ResponseEntity<?> updateSoldeConge(
            @PathVariable Long id,
            @RequestBody SoldeCongeRequest soldeCongeRequest) {
        try {
            SoldeCongeResponse soldeCongeResponse = soldeCongeService.updateSoldeConge(id, soldeCongeRequest);
            return ResponseEntity.ok(soldeCongeResponse);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }

    // Get SoldeConge record for a specific user
    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getSoldeCongeByUserId(@PathVariable Long userId) {
        try {
            SoldeCongeResponse soldeCongeResponse = soldeCongeService.getSoldeCongeByUserId(userId);
            return ResponseEntity.ok(soldeCongeResponse);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }

    // Get the current leave balance (congeRepos) with accumulated leave
    @GetMapping("/{id}/balance")
    public ResponseEntity<?> getCurrentLeaveBalance(@PathVariable Long id) {
        try {
            double currentLeaveBalance = soldeCongeService.getCurrentLeaveBalance(id);
            return ResponseEntity.ok(currentLeaveBalance);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }

    // Consume leave days
    @PostMapping("/{id}/consume")
    public ResponseEntity<?> consumeLeaveDays(
            @PathVariable Long id,
            @RequestParam double daysConsumed) {
        try {
            soldeCongeService.consumeLeaveDays(id, daysConsumed);
            return ResponseEntity.ok("Leave days consumed successfully.");
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }
}
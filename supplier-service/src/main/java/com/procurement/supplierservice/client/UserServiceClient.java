package com.procurement.supplierservice.client;

import com.procurement.common.dto.CommonResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;

/**
 * Feign client to the User Service.
 * Used to validate that the user onboarding a supplier exists in the system.
 */
@FeignClient(name = "user-service")
public interface UserServiceClient {

    @GetMapping("/api/v1/users/{id}")
    CommonResponse<Object> getUserById(
            @PathVariable("id") String id,
            @RequestHeader("Authorization") String token);
}

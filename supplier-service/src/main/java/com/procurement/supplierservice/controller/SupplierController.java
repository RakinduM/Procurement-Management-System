package com.procurement.supplierservice.controller;

import com.procurement.common.dto.CommonResponse;
import com.procurement.supplierservice.model.Supplier;
import com.procurement.supplierservice.service.SupplierService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/suppliers")
@RequiredArgsConstructor
public class SupplierController {

    private final SupplierService supplierService;

    @PostMapping
    public ResponseEntity<CommonResponse<Supplier>> createSupplier(
            @RequestBody Supplier supplier,
            @RequestHeader(value = "Authorization", required = false) String token,
            @RequestHeader(value = "X-User-Id", required = false) String createdBy) {

        // Fall back to a system identifier if header not present
        String creator = (createdBy != null) ? createdBy : "system";
        String authToken = (token != null) ? token : "";

        Supplier createdSupplier = supplierService.createSupplier(supplier, creator, authToken);
        return ResponseEntity.ok(CommonResponse.success(createdSupplier, "Supplier created successfully"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CommonResponse<Supplier>> getSupplierById(@PathVariable String id) {
        Supplier supplier = supplierService.getSupplierById(id);
        return ResponseEntity.ok(CommonResponse.success(supplier, "Supplier fetched successfully"));
    }

    @GetMapping
    public ResponseEntity<CommonResponse<List<Supplier>>> getAllSuppliers() {
        List<Supplier> suppliers = supplierService.getAllSuppliers();
        return ResponseEntity.ok(CommonResponse.success(suppliers, "Suppliers fetched successfully"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CommonResponse<Supplier>> updateSupplier(@PathVariable String id, @RequestBody Supplier supplier) {
        Supplier updatedSupplier = supplierService.updateSupplier(id, supplier);
        return ResponseEntity.ok(CommonResponse.success(updatedSupplier, "Supplier updated successfully"));
    }
}

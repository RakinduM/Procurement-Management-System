package com.procurement.supplierservice.service;

import com.procurement.common.exception.BusinessRuleException;
import com.procurement.common.exception.ResourceNotFoundException;
import com.procurement.supplierservice.client.UserServiceClient;
import com.procurement.supplierservice.model.Supplier;
import com.procurement.supplierservice.repository.SupplierRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SupplierService {

    private final SupplierRepository supplierRepository;
    private final UserServiceClient userClient;

    public Supplier createSupplier(Supplier supplier, String createdBy, String token) {
        if (supplierRepository.existsByEmail(supplier.getEmail())) {
            throw new BusinessRuleException("Supplier with this email already exists");
        }

        // Validate that the creator user exists in User Service (Inter-service call)
        try {
            userClient.getUserById(createdBy, token);
        } catch (Exception e) {
            throw new BusinessRuleException("Creator user not found in the system: " + createdBy);
        }

        supplier.setCreatedAt(new Date());
        supplier.setActive(true);
        return supplierRepository.save(supplier);
    }

    public Supplier getSupplierById(String id) {
        return supplierRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Supplier not found with id: " + id));
    }

    public List<Supplier> getAllSuppliers() {
        return supplierRepository.findAll();
    }

    public Supplier updateSupplier(String id, Supplier updatedSupplier) {
        Supplier supplier = getSupplierById(id);
        supplier.setSupplierName(updatedSupplier.getSupplierName());
        supplier.setPhone(updatedSupplier.getPhone());
        supplier.setAddress(updatedSupplier.getAddress());
        supplier.setCurrency(updatedSupplier.getCurrency());
        supplier.setActive(updatedSupplier.isActive());
        return supplierRepository.save(supplier);
    }
}

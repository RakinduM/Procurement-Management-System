package com.procurement.supplierservice.repository;

import com.procurement.supplierservice.model.Supplier;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SupplierRepository extends MongoRepository<Supplier, String> {
    Optional<Supplier> findByEmail(String email);
    boolean existsByEmail(String email);
}

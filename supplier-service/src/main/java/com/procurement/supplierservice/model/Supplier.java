package com.procurement.supplierservice.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "suppliers")
public class Supplier {
    @Id
    private String id;
    private String supplierName;
    private String email;
    private String phone;
    private String address;
    private String currency; // e.g. LKR, USD
    private boolean isActive;
    private Date createdAt;
}

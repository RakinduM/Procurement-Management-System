package com.procurement.userservice.controller;

import com.procurement.common.dto.CommonResponse;
import com.procurement.userservice.model.Branch;
import com.procurement.userservice.model.Department;
import com.procurement.userservice.model.Role;
import com.procurement.userservice.repository.BranchRepository;
import com.procurement.userservice.repository.DepartmentRepository;
import com.procurement.userservice.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users/reference")
@RequiredArgsConstructor
public class ReferenceDataController {

    private final RoleRepository roleRepository;
    private final BranchRepository branchRepository;
    private final DepartmentRepository departmentRepository;

    @GetMapping("/roles")
    public ResponseEntity<CommonResponse<List<Role>>> getRoles() {
        return ResponseEntity.ok(CommonResponse.success(roleRepository.findAll(), "Roles fetched successfully"));
    }

    @GetMapping("/branches")
    public ResponseEntity<CommonResponse<List<Branch>>> getBranches() {
        return ResponseEntity.ok(CommonResponse.success(branchRepository.findAll(), "Branches fetched successfully"));
    }

    @GetMapping("/departments")
    public ResponseEntity<CommonResponse<List<Department>>> getDepartments() {
        return ResponseEntity.ok(CommonResponse.success(departmentRepository.findAll(), "Departments fetched successfully"));
    }
}

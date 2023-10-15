package com.example.authentication.entity;

import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.Date;

@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@Setter
@Getter
public abstract class CRUEntity {
    @CreationTimestamp
    private Date createdAt = null;
    private Integer createdBy = null;
    @UpdateTimestamp
    private Date updatedAt = null;
    private Integer updatedBy = null;
}

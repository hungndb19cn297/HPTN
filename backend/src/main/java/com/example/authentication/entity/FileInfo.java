package com.example.authentication.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "files")
public class FileInfo extends CRUEntity{
    @Id
    @GeneratedValue
    private Integer id;
    private String path;
    private String fileType;
    private String fileName;
    private Long fileSize;
}

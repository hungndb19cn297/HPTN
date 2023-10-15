package com.example.authentication.repository;

import com.example.authentication.entity.FileInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FilesRepository extends JpaRepository<FileInfo, Integer> {

    FileInfo findOneById(Integer id);
}

package com.example.authentication.repository;

import com.example.authentication.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface TagRepository extends JpaRepository<Tag, Integer> {
    @Query("select t.id from Tag t where t.id in :tagIds")
    List<Integer> getIdExisted(Set<Integer> tagIds);
}

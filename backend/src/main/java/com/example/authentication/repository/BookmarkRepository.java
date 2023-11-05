package com.example.authentication.repository;

import com.example.authentication.entity.Bookmark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookmarkRepository extends JpaRepository<Bookmark, Integer> {
    Integer countByPostId(Integer id);

    Boolean existsByUserIdAndPostId(Integer userId, Integer postId);

    Bookmark findOneByUserIdAndPostId(Integer userId, Integer postId);
}

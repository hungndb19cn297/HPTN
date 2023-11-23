package com.example.authentication.repository;

import com.example.authentication.entity.Bookmark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface BookmarkRepository extends JpaRepository<Bookmark, Integer> {
    Integer countByPostId(Integer id);

    Boolean existsByUserIdAndPostId(Integer userId, Integer postId);

    Bookmark findOneByUserIdAndPostId(Integer userId, Integer postId);

    @Query("Select count(*) from Bookmark v where v.post.id = :id and v.createdAt >= :startDate")
    Integer countByPostIdFromDate(Integer id, Date startDate);
}

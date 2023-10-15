package com.example.authentication.repository;

import com.example.authentication.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {
    @Query("""
            Select p1 from Post p1 where p1.id in
                (Select p.id from Post p
                left join p.postTags.tag t
                left join p.bookmarks.user u
                where (:id is null or p.id = :id)
                And (:key is null or p.title like %:key% or p.content like %:key%)
                And (:tagId is null or t.id = :tagId)
                And (:createdBy is null or p.createdBy = :createdBy)
                And (:isBookmark is null or :isBookmark = false or u.id = :userId))
            """ )
    Page<Post> searchPost(Integer id,
                          String key,
                          Integer tagId,
                          Boolean isBookmark,
                          Integer createdBy,
                          Integer userId,
                          PageRequest of);
}

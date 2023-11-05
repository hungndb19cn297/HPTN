package com.example.authentication.repository;

import com.example.authentication.entity.Post;
import com.example.authentication.entity.Vote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface VoteRepository extends JpaRepository<Vote, Integer> {
    @Query("Select sum(vote) from Vote v where v.postId = :id")
    Integer getTotalVote(Integer id);

    Vote findOneByPostIdAndUserId(Integer postId, Integer userId);
}

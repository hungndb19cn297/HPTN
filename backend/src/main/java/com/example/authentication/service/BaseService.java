package com.example.authentication.service;

import com.example.authentication.repository.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class BaseService {
    @Autowired
    protected BookmarkRepository bookmarkRepository;
    @Autowired
    protected CommentRepository commentRepository;
    @Autowired
    protected FilesRepository filesRepository;
    @Autowired
    protected FollowRepository followRepository;
    @Autowired
    protected PostRepository postRepository;
    @Autowired
    protected PostTagRepository postTagRepository;
    @Autowired
    protected TagRepository tagRepository;
    @Autowired
    protected UserRepository userRepository;
    @Autowired
    protected VoteRepository voteRepository;
}

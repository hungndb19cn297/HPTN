package com.example.authentication.entity;


import jakarta.persistence.*;
import lombok.*;
import org.hibernate.validator.constraints.Length;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@Data
@Entity
@Table(name = "posts")
public class Post extends CRUEntity{
    @Id
    @GeneratedValue
    private Integer id;
    private String title;
    @Length(max = 20000)
    private String content;
    private Date deletedAt;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval=true)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private List<PostTag> postTags;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private List<Comment> comments;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private List<Bookmark> bookmarks;
}

package com.example.authentication.entity;


import jakarta.persistence.*;
import lombok.*;

@Setter
@Getter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "bookmarks")
public class Bookmark extends CRUEntity{
    @Id
    @GeneratedValue
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "post_id")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Post post;


    @ManyToOne
    @JoinColumn(name = "user_id")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private User user;
}

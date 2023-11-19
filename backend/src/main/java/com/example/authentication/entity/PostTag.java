package com.example.authentication.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.validator.constraints.Length;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "posts_tags")
public class PostTag extends CRUEntity{
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "post_id")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Post post;

    @ManyToOne
    @JoinColumn(name = "tag_id")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Tag tag;

    public PostTag(Integer tagId, Post post) {
        this.tag = new Tag(tagId);
        this.post = post;
    }
}

package com.example.authentication.service;

import com.example.authentication.dto.report.ReportPostInteractDto;
import com.example.authentication.dto.report.ReportUserInteractDto;
import com.example.authentication.dto.tag.TagDto;
import com.example.authentication.dto.user.UseInfoDto;
import com.example.authentication.entity.*;
import com.example.authentication.model.PeriodReport;
import com.example.authentication.utils.ConvertUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;

import static com.example.authentication.utils.DateTimeUtils.getDatePeriod;

@Service
@Slf4j
public class ReportService extends BaseService {

    public void getReportUserInteract(){

    }

    public List<ReportUserInteractDto> getReportUserInteract(PeriodReport periodReport){
        Date startDate = getDatePeriod(periodReport);
        List<ReportPostInteractDto> postReportDto = getReportPostInteract(periodReport);
        List<Follow> followList = followRepository.findAllByCreatedAt(startDate);

        Map<Integer, ReportUserInteractDto> userReportDto = new HashMap<>();
        for (ReportPostInteractDto dto : postReportDto) {
            int userId = dto.getCreatedBy().getId();
            if (userReportDto.get(userId) == null)
                userReportDto.put(userId, new ReportUserInteractDto(dto.getCreatedBy()));
            ReportUserInteractDto reportDto = userReportDto.get(userId);
            reportDto.setBookmarksCount(reportDto.getCommentCount() + dto.getBookmarksCount());
            reportDto.setVoteCount(reportDto.getVoteCount() + dto.getVoteCount());
            reportDto.setCommentCount(reportDto.getCommentCount() + dto.getCommentCount());
        }
        for (Follow follow : followList) {
            int userId = follow.getToUser().getId();
            if (userReportDto.get(userId) == null)
                userReportDto.put(userId, new ReportUserInteractDto(ConvertUtils.convert(follow.getToUser(), UseInfoDto.class)));
            ReportUserInteractDto reportDto = userReportDto.get(userId);
            reportDto.setFollowCount(reportDto.getFollowCount() + 1);
        }
        return userReportDto
                .values()
                .stream()
                .peek(reportDto -> reportDto.setTotalInteract(reportDto.getBookmarksCount() + reportDto.getCommentCount() + reportDto.getVoteCount() + reportDto.getFollowCount()))
        .sorted((o1, o2) -> o1.getTotalInteract() < o2.getTotalInteract() ? 1 :-1).toList();
    }

    public List<ReportPostInteractDto> getReportPostInteract(PeriodReport periodReport){
        Date startDate = getDatePeriod(periodReport);
        List<Post> postReport = postRepository.findPostByItemCreatedAt(startDate);

        return postReport.stream().map(post -> {
            ReportPostInteractDto postDto = ConvertUtils.convert(post, ReportPostInteractDto.class);
            postDto.setTags(ConvertUtils.convertList(post.getPostTags().stream().map(PostTag::getTag).toList(), TagDto.class));
            postDto.setCreatedBy(ConvertUtils.convert(userRepository.findOneById(post.getCreatedBy()),UseInfoDto.class));
            postDto.setCommentCount(commentRepository.countByPostIdAndDeletedAtFromDate(post.getId(), startDate));
            postDto.setBookmarksCount(bookmarkRepository.countByPostIdFromDate(post.getId(), startDate));
            postDto.setVoteCount(voteRepository.getTotalVoteFromDate(post.getId(), startDate));
            postDto.setTotalInteract(postDto.getBookmarksCount() + postDto.getCommentCount() + postDto.getVoteCount());
            return postDto;
        }).sorted((o1, o2) -> o1.getTotalInteract() < o2.getTotalInteract() ? 1 :-1).toList();
    }
}

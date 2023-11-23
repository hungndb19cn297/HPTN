package com.example.authentication.controller;

import com.example.authentication.dto.report.ReportPostInteractDto;
import com.example.authentication.dto.report.ReportUserInteractDto;
import com.example.authentication.model.PeriodReport;
import com.example.authentication.service.ReportService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("reports")
@CrossOrigin(origins = "*")
@Slf4j
public class ReportController {
    @Autowired
    ReportService reportService;

    @GetMapping("/pub/post-interact")
    public List<ReportPostInteractDto> getReportPostInteract(@RequestParam PeriodReport periodReport){
        return reportService.getReportPostInteract(periodReport);
    }

    @GetMapping("/pub/user-interact")
    public List<ReportUserInteractDto> getReportUserInteract(@RequestParam PeriodReport periodReport){
        return reportService.getReportUserInteract(periodReport);
    }
}

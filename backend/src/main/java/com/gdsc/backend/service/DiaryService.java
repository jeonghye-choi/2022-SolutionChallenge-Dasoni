package com.gdsc.backend.service;

import com.gdsc.backend.entity.Diary;
import com.gdsc.backend.http.request.DiaryRequest;
import com.gdsc.backend.repository.DiaryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@ComponentScan
@Service
public class DiaryService {
    private final DiaryRepository diaryRepository;

    @Autowired
    public DiaryService(DiaryRepository diaryRepository) {this.diaryRepository=diaryRepository; }

    public Page<Diary> findDiaries(Pageable pageable){
        return diaryRepository.findAll(pageable);
    }

    @Transactional
    public Diary findDiary(UUID id){
        return diaryRepository.getById(id);
    }

    public Diary save(DiaryRequest diaryRequest) {
        return diaryRepository.save(
                Diary.builder()
                        .title(diaryRequest.getTitle())
                        .emotion(diaryRequest.getEmotion())
                        .content(diaryRequest.getContent())
                        .build());
    }

    public void deleteById(UUID idx) {
        diaryRepository.deleteById(idx);
    }


}

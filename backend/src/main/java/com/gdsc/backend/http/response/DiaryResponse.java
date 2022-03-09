package com.gdsc.backend.http.response;

import com.gdsc.backend.entity.Diary;
import com.gdsc.backend.entity.enums.EmotionType;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

import java.net.URI;
import java.time.LocalDate;
import java.util.UUID;

@Getter
public class DiaryResponse {
    private DiaryContentResponse content;
    @Schema(description = "다이어리 링크", nullable = true, example = "http://{url}/{diary_id}")
    private String link;

    private DiaryResponse(String link, DiaryContentResponse content) {
        this.link = link;
        this.content = content;
    }

    public static DiaryResponse of(URI uri, Diary diary) {
        return new DiaryResponse(uri.toString(), null);
    }

}

package com.green.VO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor 
public class ConditionValue {
    private int pageNum = 1; // 기본값으로 1을 설정
    private int amount = 9; // 기본값으로 9를 설정
    private int year; // 년도 필터링에 사용될 필드
}

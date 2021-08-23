import java.math.BigDecimal;

public class test {
    public static void main(String[] args) {
        String cMonth = "20200302";
        BigDecimal dateRate = null;
        int m = Integer.parseInt(cMonth.substring(4, 6)); //当前月份 12
        int currentDay = Integer.parseInt(cMonth.substring(6, 8)); //当前天数 16
        String date1 = "2020"; // 年份 选中日期2020
        String hy = "Y1"; // Y1,Y2 上半年or下半年 
        String cyear = cMonth.substring(0, 4); // 当前年 2020
        int year1 = Integer.parseInt(date1); //2019
        int year2 = Integer.parseInt(cyear); //2020
        
        int totalY1 = getTotalDays(year2, 6) + 30;
        int totalY2 = getTotalDays(year2, 12) + 31 - totalY1;
        int totalYear = totalY1 + totalY2;
        
        int selDays = 0;

        if (year1 < year2) {
            dateRate = new BigDecimal(100); //选中年小于当前年
        } else if (year1 > year2) {
            dateRate = BigDecimal.ZERO;  //选中年大于当前年
        } else {
            if (hy.equals("Y1")) {
                // 查询上半年
                if (m > 6) { //当前月份大于6
                    dateRate = new BigDecimal(100);
                } else {
                    selDays = getTotalDays(year1, m) + currentDay;
                    dateRate = new BigDecimal(selDays).multiply(new BigDecimal(100.00)).divide(new BigDecimal(totalY1), 2,
                            BigDecimal.ROUND_HALF_UP);
                }
            } else if (hy.equals("Y2")) {
                // 查询下半年
                if (m > 6) {
                    selDays = getTotalDays(year1, m) + currentDay - totalY1;
                    dateRate = new BigDecimal(selDays).multiply(new BigDecimal(100.00)).divide(new BigDecimal(totalY2), 2,
                            BigDecimal.ROUND_HALF_UP);
                } else {
                    dateRate = BigDecimal.ZERO;
                }
            } else { //全年
                selDays = getTotalDays(year1, m) + currentDay;
                dateRate = new BigDecimal(selDays).multiply(new BigDecimal(100.00)).divide(new BigDecimal(totalYear), 2,
                        BigDecimal.ROUND_HALF_UP);
            }
        }
    }

    private static int getTotalDays(int year, int month) {
        //获取日期天数
		int days = 0;
		
		for (int i = 1; i < month; i++) {
			switch (i) {
			case 1:
			case 3:
			case 5:
			case 7:
			case 8:
			case 10:
			case 12:
				days += 31;
				break;
			case 4:
			case 6:
			case 9:
			case 11:
				days += 30;
				break;
			case 2:
				if (year % 4 == 0 && year % 100 != 0) {// 是闰年
					days += 29;
				} else {// 不是闰年
					days += 28;
				}
			}
		}
		
		return days;
    }
}

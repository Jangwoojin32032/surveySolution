package kr.co.netpoint.service.imp;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import kr.co.netpoint.dao.CommonDao;
import kr.co.netpoint.service.CommonService;
import kr.co.netpoint.vo.project.PnAdminVO;
import kr.co.netpoint.vo.project.SlCodeVO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("CommonService")
public class CommonServiceImp implements CommonService {
	
	static final Logger logger = LoggerFactory.getLogger(CommonServiceImp.class);
	
	@Autowired
	private CommonDao commonDao;

	public List<SlCodeVO> listCode(SlCodeVO codeVO) {
		return this.commonDao.listCode(codeVO);
	}

	public List<Object> listDateYYYYMM(String beginDateYYYYMM, String endDateYYYYMM) {
		List<Object> returnList = new ArrayList();

		int bY = Integer.parseInt(beginDateYYYYMM.substring(0, 4));
		int bM = Integer.parseInt(beginDateYYYYMM.substring(4, 6));
		int eY = Integer.parseInt(endDateYYYYMM.substring(0, 4));
		int eM = Integer.parseInt(endDateYYYYMM.substring(4, 6));

		int setIndex = 0;
		for (int i = bY; i <= eY; i++) {
			for (int j = bM; j <= eM; j++) {
				String setYear = String.valueOf(i);
				String setMonth = String.valueOf(j);
				if (10 > j) {
					setMonth = "0" + setMonth;
				}
				Map<String, Object> setMap = new HashMap();
				setMap.put("getKey", setYear + setMonth);
				setMap.put("getValue", setYear + "��" + setMonth + "��");
				returnList.add(setIndex, setMap);
			}
			setIndex++;
		}
		return returnList;
	}

	public PnAdminVO selectPnAdmin(PnAdminVO pnAdminVO) {
		return this.commonDao.selectPnAdmin(pnAdminVO);
	}

	public SlCodeVO selectCode(SlCodeVO codeVO) {
		return this.commonDao.selectCode(codeVO);
	}
}

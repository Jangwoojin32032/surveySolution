package kr.co.netpoint.dao;

import java.util.List;
import javax.annotation.Resource;
import kr.co.netpoint.vo.project.PnAdminVO;
import kr.co.netpoint.vo.project.SlCodeVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

@Repository("CommonDao")
public class CommonDao {
	
	private static final String mCommonNameSpace = "mCommon";
	private static final String oMemberNameSpace = "oMember";
	
	@Resource(name = "oracleSqlSessionTemplate")
	SqlSessionTemplate oracleSqlSessionTemplate;
	
	@Resource(name = "mysqlSqlSessionTemplate")
	SqlSessionTemplate mysqlSqlSessionTemplate;

	public List<SlCodeVO> listCode(SlCodeVO codeVO) {
		return this.mysqlSqlSessionTemplate.selectList("mCommon.selectCode", codeVO);
	}

	public PnAdminVO selectPnAdmin(PnAdminVO pnAdminVO) {
		return (PnAdminVO) this.oracleSqlSessionTemplate.selectOne("oMember.selectPnAdmin", pnAdminVO);
	}

	public SlCodeVO selectCode(SlCodeVO codeVO) {
		return (SlCodeVO) this.mysqlSqlSessionTemplate.selectOne("mCommon.selectCode", codeVO);
	}
}

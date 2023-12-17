package com.prometheus;

import static com.prometheus.model.Profiles.TEST;
import static org.junit.Assert.assertTrue;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import com.prometheus.email.Emailer;

@ActiveProfiles(TEST)
@RunWith(SpringRunner.class)
@SpringBootTest(classes = AuthApplication.class)
public class AuthApplicationTest {
	
	@MockBean
    private Emailer emailer;

	@Test
	public void applicationTest() {
		assertTrue("AuthApplication context does not initialize!", true);
	}

}
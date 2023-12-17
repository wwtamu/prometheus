package com.prometheus;

import static com.prometheus.model.Profiles.TEST;
import static org.junit.Assert.assertTrue;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

@ActiveProfiles(TEST)
@RunWith(SpringRunner.class)
@SpringBootTest(classes = RemoteApplication.class)
public class RemoteApplicationTest {

	@Test
	public void applicationTest() {
		assertTrue("RemoteApplication context does not initialize!", true);
	}

}

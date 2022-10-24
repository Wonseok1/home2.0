package com.itzon.home.config

import com.itzon.home.common.properties.PortProperties
import com.itzon.home.common.properties.SFTPProperties
import org.apache.catalina.Context
import org.apache.catalina.connector.Connector
import org.apache.tomcat.util.descriptor.web.SecurityCollection
import org.apache.tomcat.util.descriptor.web.SecurityConstraint
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory
import org.springframework.boot.web.servlet.server.ServletWebServerFactory
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import javax.sound.sampled.Port

@Configuration
class ConnectorConfig (
    val portProperties: PortProperties,
    ){
    @Bean
    fun servletContainer(): ServletWebServerFactory? {
        val tomcat = TomcatServletWebServerFactory()
        tomcat.addAdditionalTomcatConnectors(createStandardConnector())
        return tomcat
    }

    private fun createStandardConnector(): Connector? {
        val connector = Connector("org.apache.coyote.http11.Http11NioProtocol")
        connector.port = portProperties.http
        return connector
    }
}


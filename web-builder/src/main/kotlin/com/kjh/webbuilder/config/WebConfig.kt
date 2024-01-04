package com.kjh.webbuilder.config

import org.springframework.boot.web.server.WebServerFactoryCustomizer
import org.springframework.boot.web.servlet.server.ConfigurableServletWebServerFactory
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.ViewResolver
import org.springframework.web.servlet.config.annotation.*
import org.springframework.web.servlet.view.InternalResourceViewResolver


@EnableWebMvc
@Configuration
open class WebConfig: WebMvcConfigurer {

    override fun addResourceHandlers(registry: ResourceHandlerRegistry) {
        registry.addResourceHandler("/react/**")
            .addResourceLocations("classpath:/react/")
            .resourceChain(true)
    }

    @Bean
    open fun getViewResolver(): ViewResolver {
        return InternalResourceViewResolver()
    }

    override fun configureDefaultServletHandling(configurer: DefaultServletHandlerConfigurer) {
        configurer.enable()
    }

    @Bean
    open fun enableDefaultServlet(): WebServerFactoryCustomizer<ConfigurableServletWebServerFactory>? {
        return WebServerFactoryCustomizer { factory: ConfigurableServletWebServerFactory ->
            factory.setRegisterDefaultServlet(true)
        }
    }

    override fun configurePathMatch(configurer: PathMatchConfigurer) {
        configurer.setUseTrailingSlashMatch(true)
    }

    override fun addViewControllers(registry: ViewControllerRegistry) {
        val prefix = "/web-builder"
        registry.addViewController(prefix)
            .setViewName("forward:/react/index.html")
        registry.addViewController("$prefix/")
            .setViewName("forward:/react/index.html")
        registry.addViewController("$prefix/{path:[^\\.]*}")
            .setViewName("forward:/react/index.html")
        registry.addViewController("$prefix/**/{path:[^\\.]*}")
            .setViewName("forward:/react/index.html")
    }
}
package main

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	e := echo.New()

	e.GET("/api/todolist", GetTodo)
	e.GET("/api/todo/:id", GetOneTodo)
	e.POST("/api/todo", AddTodo)
	e.PUT("/api/todo/:id", EditTodo)
	e.DELETE("/api/todo/:id", RemoveTodo)

	e.Use(middleware.Logger())
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowHeaders: []string{"*"},
	}))

	e.Logger.Info(e.Start(":8080"))
}

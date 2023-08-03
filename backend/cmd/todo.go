package main

import (
	"net/http"

	model "github.com/jhkim988/redux-typescript/backend/model"
	"github.com/labstack/echo/v4"
)

var todoStore = &model.TodoMap{
	Store: make(map[string]model.Todo),
}

func GetTodo(c echo.Context) error {
	keyword := c.QueryParam("keyword")
	ret := todoStore.Get(keyword)
	return c.JSON(http.StatusOK, ret)
}

func GetOneTodo(c echo.Context) error {
	id := c.Param("id")
	ret, _ := todoStore.GetOne(id)
	return c.JSON(http.StatusOK, ret)
}

func AddTodo(c echo.Context) error {
	todo := new(model.Todo)
	if err := c.Bind(todo); err != nil {
		return err
	}
	newId := todoStore.Add(*todo)
	return c.JSON(http.StatusOK, &map[string]string{"id": newId})
}

func EditTodo(c echo.Context) error {
	todo := new(model.Todo)
	if err := c.Bind(todo); err != nil {
		return err
	}
	if err := todoStore.Edit(*todo); err != nil {
		return err
	}
	return c.NoContent(http.StatusOK)
}

func RemoveTodo(c echo.Context) error {
	id := c.Param("id")
	if err := todoStore.Remove(id); err != nil {
		return err
	}
	return c.NoContent(http.StatusOK)
}

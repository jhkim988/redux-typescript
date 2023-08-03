package model

import (
	"fmt"
	"strings"
	"sync"
)

type Todo struct {
	Id       string `json:"id"`
	Text     string `json:"text"`
	Status   string `json:"status"`
	Deadline uint64 `json:"deadline"`
}

type TodoStore interface {
	Add(todo Todo)
	Get(keyword string) map[string]Todo
	GetOne(id string) (Todo, bool)
	Edit(todo Todo) error
	Remove(id string) error
}

type TodoMap struct {
	mu     sync.Mutex
	nextId uint64
	Store  map[string]Todo
}

const (
	TODO_UNSTARTED  = "unstarted"
	TODO_PROCEEDING = "proceeding"
	TODO_SUCCESS    = "success"
)

func (s *TodoMap) Add(todo Todo) string {
	s.mu.Lock()
	defer s.mu.Unlock()

	todo.Id = fmt.Sprintf("%d", s.nextId)
	s.nextId++
	todo.Status = TODO_UNSTARTED
	s.Store[todo.Id] = todo
	return todo.Id
}

func (s *TodoMap) Get(keyword string) map[string]Todo {
	s.mu.Lock()
	defer s.mu.Unlock()

	ret := make(map[string]Todo)
	for key, value := range s.Store {
		if strings.Contains(value.Text, keyword) {
			ret[key] = value
		}
	}
	return ret
}

func (s *TodoMap) GetOne(id string) (Todo, bool) {
	s.mu.Lock()
	defer s.mu.Unlock()

	ret, ok := s.Store[id]
	return ret, ok
}

func (s *TodoMap) Edit(todo Todo) error {
	s.mu.Lock()
	defer s.mu.Unlock()

	if _, ok := s.Store[todo.Id]; !ok {
		return fmt.Errorf("존재하지 않는 todo Id - %s", todo.Id)
	}
	s.Store[todo.Id] = todo
	return nil
}

func (s *TodoMap) Remove(id string) error {
	s.mu.Lock()
	defer s.mu.Unlock()

	if _, ok := s.Store[id]; !ok {
		return fmt.Errorf("존재하지 않는 todo Id - %s", id)
	}
	delete(s.Store, id)
	return nil
}

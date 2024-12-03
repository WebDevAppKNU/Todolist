import React, { useState } from "react";

function Todolist() {
    const [folders, setFolders] = useState([
        { id: 1, name: "개인" },
        { id: 2, name: "업무" },
    ]);
    const [todos, setTodos] = useState({
        1: [
            { id: 1, title: "운동하기", content: "매일 아침 30분 운동", check: false },
            { id: 2, title: "책 읽기", content: "소설 한 권 읽기", check: true },
        ],
        2: [
            { id: 1, title: "프로젝트 보고서 작성", content: "최종 보고서 작성 및 검토", check: false },
            { id: 2, title: "팀 회의 준비", content: "발표 자료 준비 및 회의록 작성", check: true },
        ],
    });
    const [favorites, setFavorites] = useState([]);
    const [selectedFolder, setSelectedFolder] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTodo, setEditingTodo] = useState(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [newFolderName, setNewFolderName] = useState("");
    const [query, setQuery] = useState("");

    const onAddOrUpdate = () => {
        if (title.trim() === "" || content.trim() === "") {
            alert("제목과 내용을 입력하세요!");
            return;
        }
        const folderTodos = todos[selectedFolder] || [];
        if (editingTodo) {
            const updatedTodos = folderTodos.map((todo) =>
                todo.id === editingTodo.id ? { ...todo, title, content } : todo
            );
            setTodos({ ...todos, [selectedFolder]: updatedTodos });
        } else {
            const id = folderTodos.length > 0 ? folderTodos[folderTodos.length - 1].id + 1 : 1;
            const updatedTodos = [...folderTodos, { id, title, content, check: false }];
            setTodos({ ...todos, [selectedFolder]: updatedTodos });
        }
        closeModal();
    };

    const onDelete = (id) => {
        const folderTodos = todos[selectedFolder];
        const updatedTodos = folderTodos.filter((todo) => todo.id !== id);
        setTodos({ ...todos, [selectedFolder]: updatedTodos });
    };

    const toggleFavorite = (todoId) => {
        setFavorites((prev) =>
            prev.includes(todoId)
                ? prev.filter((id) => id !== todoId)
                : [...prev, todoId]
        );
    };

    const openModal = (todo = null) => {
        setIsModalOpen(true);
        if (todo) {
            setEditingTodo(todo);
            setTitle(todo.title);
            setContent(todo.content);
        } else {
            setEditingTodo(null);
            setTitle("");
            setContent("");
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingTodo(null);
        setTitle("");
        setContent("");
    };

    const filteredTodos = (todos[selectedFolder] || []).filter(
        (todo) =>
            todo.title.toLowerCase().includes(query.toLowerCase()) ||
            todo.content.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div style={{ display: "flex", height: "100vh" }}>
            {/* 폴더 리스트 */}
            <div
                style={{
                    width: "300px",
                    borderRight: "2px solid #ccc",
                    padding: 10,
                    boxSizing: "border-box",
                }}
            >
                <h2>ToDoList</h2>
                <button
                    onClick={() => openModal()}
                    style={{
                        width: "100%",
                        padding: 10,
                        backgroundColor: "#2196f3",
                        fontSize: 16,
                        fontWeight: "bold",
                        color: "white",
                        border: "none",
                        borderRadius: 5,
                        cursor: "pointer",
                    }}
                >
                    메모 쓰기
                </button>

                <ul style={{ listStyle: "none", padding: 0 }}>
                    {folders.map((folder) => (
                        <li
                            key={folder.id}
                            style={{
                                padding: 10,
                                marginBottom: 5,
                                cursor: "pointer",
                                backgroundColor: selectedFolder === folder.id ? "#ddd" : "transparent",
                            }}
                            onClick={() => setSelectedFolder(folder.id)}
                        >
                            {folder.name}
                        </li>
                    ))}
                </ul>
                <div>
                    <input
                        type="text"
                        value={newFolderName}
                        onChange={(e) => setNewFolderName(e.target.value)}
                        placeholder="새 폴더 이름"
                        style={{
                            width: "100%",
                            padding: 5,
                            marginBottom: 5,
                            boxSizing: "border-box",
                        }}
                    />
                    <button
                        onClick={() => {
                            if (newFolderName.trim()) {
                                const id = folders.length > 0 ? folders[folders.length - 1].id + 1 : 1;
                                setFolders([...folders, { id, name: newFolderName.trim() }]);
                                setNewFolderName("");
                            }
                        }}
                        style={{
                            width: "100%",
                            padding: 10,
                            backgroundColor: "#4caf50",
                            color: "white",
                            border: "none",
                            cursor: "pointer",
                        }}
                    >
                        폴더 추가
                    </button>
                </div>
            </div>

            {/* 메모 영역 */}
            <div style={{ flex: 1, padding: 20 }}>
                <h2>{folders.find((folder) => folder.id === selectedFolder)?.name} To-Do List</h2>
                <input
                    type="text"
                    placeholder="검색 (제목/내용)"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    style={{
                        width: "100%",
                        padding: 10,
                        marginBottom: 20,
                        boxSizing: "border-box",
                    }}
                />
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                        gap: 20,
                    }}
                >
                    {filteredTodos.map((todo) => (
                        <div
                            key={todo.id}
                            style={{
                                border: "1px solid #ccc",
                                borderRadius: 10,
                                padding: 10,
                                backgroundColor: "white",
                            }}
                        >
                            <h3
                                onClick={() => openModal(todo)}
                                style={{
                                    cursor: "pointer",
                                    fontSize: 18,
                                    margin: 0,
                                    textDecoration: todo.check ? "line-through" : "none",
                                }}
                            >
                                {todo.title}
                            </h3>
                            <p style={{ fontSize: 14, color: "#555" }}>{todo.content}</p>
                            <button
                                onClick={() => toggleFavorite(todo.id)}
                                style={{
                                    backgroundColor: favorites.includes(todo.id) ? "#ffcc00" : "#ccc",
                                    color: "black",
                                    border: "none",
                                    borderRadius: 5,
                                    padding: "5px 10px",
                                    cursor: "pointer",
                                    fontSize: 12,
                                }}
                            >
                                {favorites.includes(todo.id) ? "★ 즐겨찾기 해제" : "☆ 즐겨찾기"}
                            </button>
                            <button
                                onClick={() => onDelete(todo.id)}
                                style={{
                                    backgroundColor: "#ff4d4d",
                                    color: "white",
                                    border: "none",
                                    borderRadius: 5,
                                    padding: "5px 10px",
                                    cursor: "pointer",
                                    fontSize: 12,
                                    float: "right",
                                }}
                            >
                                삭제
                            </button>
                        </div>
                    ))}
                </div>
                <h3>즐겨찾기 목록</h3>
                {favorites.map((id) => {
                    const note = todos[selectedFolder]?.find((todo) => todo.id === id);
                    return note ? (
                        <div key={id} onClick={() => openModal(note)}>
                            {note.title}
                        </div>
                    ) : null;
                })}
            </div>

            {isModalOpen && (
                <div
                    style={{
                        position: "fixed",
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.3)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <div
                        style={{
                            backgroundColor: "white",
                            width: "80%",
                            height: "80%",
                            borderRadius: 10,
                            textAlign: "center",
                        }}
                    >
                        <div
                            style={{
                                width: "100%",
                                height: 80,
                                padding: "15px 20px",
                                boxSizing: "border-box",
                                fontSize: 20,
                                fontWeight: "bold",
                            }}
                        >
                            To-Do 작성/수정
                        </div>
                        <div style={{ padding: 10 }}>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="제목 입력"
                                style={{
                                    width: "100%",
                                    padding: 10,
                                    fontSize: 16,
                                    boxSizing: "border-box",
                                    marginBottom: 10,
                                }}
                            />
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="내용 입력"
                                style={{
                                    width: "100%",
                                    height: 200,
                                    padding: 10,
                                    fontSize: 16,
                                    boxSizing: "border-box",
                                }}
                            ></textarea>
                            <button
                                onClick={onAddOrUpdate}
                                style={{
                                    width: "100%",
                                    padding: 10,
                                    backgroundColor: "#4caf50",
                                    fontSize: 16,
                                    fontWeight: "bold",
                                    color: "white",
                                    border: "none",
                                    borderRadius: 5,
                                    cursor: "pointer",
                                }}
                            >
                                저장
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Todolist;

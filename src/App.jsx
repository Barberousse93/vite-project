import { useState, useEffect } from "react"
import { TextField, Button, List, ListItem, ListItemText } from "@mui/material"

function App() {
  const [items, setItems] = useState([])
  const [newItem, setNewItem] = useState("")

  useEffect(() => {
    fetch("http://localhost:3000/items")
      .then((response) => response.json())
      .then((data) => setItems(data))
  }, [])

  const handleAddItem = () => {
    fetch("http://localhost:3000/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newItem }),
    })
      .then((response) => response.json())
      .then((data) => setItems([...items, data]))

    setNewItem("")
  }

  return (
    <div>
      <TextField
        label="Nouvel élément"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleAddItem}>
        Ajouter
      </Button>
      <List>
        {items.map((item) => (
          <ListItem key={item.id}>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default App

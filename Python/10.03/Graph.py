from typing import List, Tuple


def read_graph(file_name: str) -> Tuple[int, List[List[int]]]:
    with open(file_name, "r", encoding="utf-8") as file:
        lines = file.readlines()
        num_vertices = int(lines[0].strip())
        adjacency_list = []

        for line in lines[1:]:
            neighbours = list(map(int, line.strip().split()))
            adjacency_list.append(neighbours)

    return num_vertices, adjacency_list


def write_neighbours_list(adjacency_list: List[List[int]]):
    for i, neighbours in enumerate(adjacency_list):
        filtered_neighbours = [neighbour for neighbour in neighbours if neighbour != i]
        print(f"Wierzchołek {i} ma sąsiadów: {', '.join(map(str, filtered_neighbours))}")


def list_to_matrix(num_vertices: int, adjacency_list: List[List[int]]) -> List[List[int]]:
    matrix = [[0] * num_vertices for _ in range(num_vertices)]
    for i, neighbours in enumerate(adjacency_list):
        for neighbour in neighbours:
            matrix[i][neighbour] = 1
    return matrix


def write_matrix(matrix: List[List[int]]):
    print("Macierz sąsiedztwa:")
    for row in matrix:
        print(" ".join(map(str, row)))


def main():
    file_name = "graph.txt"
    num_vertices, adjacency_list = read_graph(file_name)

    print("Lista sąsiedztwa:")
    write_neighbours_list(adjacency_list)

    adjacency_matrix = list_to_matrix(num_vertices, adjacency_list)

    write_matrix(adjacency_matrix)


if __name__ == "__main__":
    main()

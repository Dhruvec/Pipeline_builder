from typing import Any

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:3001", "http://127.0.0.1:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PipelineNode(BaseModel):
    id: str
    type: str | None = None
    position: dict[str, Any] | None = None
    data: dict[str, Any] | None = None


class PipelineEdge(BaseModel):
    id: str | None = None
    source: str
    target: str
    sourceHandle: str | None = None
    targetHandle: str | None = None


class PipelinePayload(BaseModel):
    nodes: list[PipelineNode] = []
    edges: list[PipelineEdge] = []


def is_directed_acyclic_graph(nodes: list[PipelineNode], edges: list[PipelineEdge]) -> bool:
    graph = {node.id: [] for node in nodes}

    for edge in edges:
        graph.setdefault(edge.source, [])
        graph.setdefault(edge.target, [])
        graph[edge.source].append(edge.target)

    visiting = set()
    visited = set()

    def has_cycle(node_id: str) -> bool:
        if node_id in visiting:
            return True
        if node_id in visited:
            return False

        visiting.add(node_id)

        for neighbor in graph[node_id]:
            if has_cycle(neighbor):
                return True

        visiting.remove(node_id)
        visited.add(node_id)
        return False

    return not any(has_cycle(node_id) for node_id in graph)


@app.get("/")
def read_root():
    return {"Ping": "Pong"}


@app.post("/pipelines/parse")
def parse_pipeline(pipeline: PipelinePayload):
    return {
        "num_nodes": len(pipeline.nodes),
        "num_edges": len(pipeline.edges),
        "is_dag": is_directed_acyclic_graph(pipeline.nodes, pipeline.edges),
    }

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import jsPDF from "jspdf";

export default function Roadmap({ u, t, su }) {
  const svgRef = useRef();
  const [selectedTopic, setSelectedTopic] = useState(null);

  /* ============================
     D3 ROADMAP
  ============================ */
  useEffect(() => {
    if (!u?.roadmap || u.roadmap.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 800;
    const height = 400;
    svg.attr("width", width).attr("height", height);

    const nodes = u.roadmap.map((topic, index) => ({
      ...topic,
      x: (index * 200) % width + 60,
      y: Math.floor(index / 4) * 120 + 80,
      completed: u.completedTopics?.includes(topic.id) || false
    }));

    const simulation = d3
      .forceSimulation(nodes)
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(45))
      .on("tick", ticked);

    function ticked() {
      node.attr(
        "transform",
        d =>
          `translate(${Math.max(40, Math.min(width - 40, d.x))},
                     ${Math.max(40, Math.min(height - 40, d.y))})`
      );
    }

    const node = svg
      .append("g")
      .selectAll("g")
      .data(nodes)
      .join("g")
      .style("cursor", "pointer");

    node
      .append("circle")
      .attr("r", 32)
      .attr("fill", d => (d.completed ? "#10b981" : "#3b82f6"))
      .attr("stroke", "#fff")
      .attr("stroke-width", 4);

    node
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("fill", "white")
      .attr("font-size", 11)
      .attr("font-weight", 600)
      .text(d =>
        d.name.length > 9 ? d.name.slice(0, 9) + "…" : d.name
      )
      .style("pointer-events", "none");

    node.on("click", (_, d) => {
      setSelectedTopic(d);
      if (!d.completed) completeTopic(d.id);
    });

    /* Progress bar */
    const progress =
      ((u.completedTopics?.length || 0) / u.roadmap.length) * 100;

    svg
      .append("rect")
      .attr("x", 20)
      .attr("y", 20)
      .attr("width", 200)
      .attr("height", 14)
      .attr("rx", 8)
      .attr("fill", "#e5e7eb");

    svg
      .append("rect")
      .attr("x", 20)
      .attr("y", 20)
      .attr("width", progress * 2)
      .attr("height", 14)
      .attr("rx", 8)
      .attr("fill", "#10b981");

    svg
      .append("text")
      .attr("x", 25)
      .attr("y", 31)
      .attr("font-size", 12)
      .attr("fill", "#1f2937")
      .text(`${Math.round(progress)}%`);
  }, [u]);

  /* ============================
     COMPLETE TOPIC
  ============================ */
  const completeTopic = async topicId => {
    try {
      await fetch("https://reaidy-io-qkie.onrender.com/api/assessment/complete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${t}`
        },
        body: JSON.stringify({ topicId })
      });

      su({
        ...u,
        completedTopics: [...(u.completedTopics || []), topicId]
      });
    } catch (err) {
      console.error("Complete topic error", err);
    }
  };

  /* ============================
     EXPORT PDF
  ============================ */
  const exportPDF = () => {
    const pdf = new jsPDF("l", "mm", "a4");

    pdf.setFontSize(22);
    pdf.text("Personalized Learning Roadmap", 20, 30);

    pdf.setFontSize(14);
    pdf.text(`Name: ${u.name}`, 20, 50);
    pdf.text(
      `Progress: ${Math.round(
        ((u.completedTopics?.length || 0) / u.roadmap.length) * 100
      )}%`,
      20,
      65
    );

    pdf.setFontSize(12);
    pdf.text("Learning Path:", 20, 85);

    u.roadmap.forEach((t, i) => {
      const status = u.completedTopics.includes(t.id)
        ? "Completed"
        : "Pending";
      pdf.text(`${i + 1}. ${t.name} - ${status}`, 20, 100 + i * 10);
    });

    pdf.save(`roadmap-${u.name}.pdf`);
  };

  /* ============================
     EMPTY STATE
  ============================ */
  if (!u?.roadmap?.length) {
    return (
      <div className="card p-12 text-center">
        <h2 className="text-2xl font-bold mb-3">
          Complete Quiz First 🚀
        </h2>
        <p className="text-gray-600">
          Take assessment to generate roadmap
        </p>
      </div>
    );
  }

  /* ============================
     UI
  ============================ */
  return (
    <div className="container py-8">
      <div className="card p-6">

        <h3 className="text-2xl font-bold mb-4">
          🗺️ Interactive Roadmap
        </h3>

        <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-4 rounded-xl border-2 border-dashed">
          <svg ref={svgRef} className="w-full h-80" />
        </div>

        {/* SELECTED TOPIC DETAILS */}
        {selectedTopic && (
          <div className="mt-6 p-6 rounded-xl bg-indigo-50 border">
            <h4 className="text-xl font-bold mb-2">
              📖 {selectedTopic.name}
            </h4>

            <p className="text-sm mb-3">
              <b>Level:</b> {selectedTopic.level}
            </p>

            {selectedTopic.resources?.map((link, i) => (
              <a
                key={i}
                href={link}
                target="_blank"
                rel="noreferrer"
                className="block text-blue-600 underline mb-1"
              >
                📚 {link}
              </a>
            ))}
          </div>
        )}

        <button
          className="btn w-full mt-6 text-lg"
          onClick={exportPDF}
        >
          📥 Download PDF Roadmap
        </button>
      </div>
    </div>
  );
}

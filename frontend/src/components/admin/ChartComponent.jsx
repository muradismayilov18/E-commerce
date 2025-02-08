import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend, } from 'chart.js';

// Chart.js üçün lazımlı modulları qeydiyyatdan keçirmək
ChartJS.register(CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend);

const ChartComponent = ({ title, labels, dataPoints }) => {
    // Qradient rənglər yaradırıq
    const gradientColors = [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
    ];

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Satışlar',
                data: dataPoints,
                backgroundColor: gradientColors,
                borderColor: 'white', // Kenarlıq rəngi
                borderWidth: 2,
                hoverOffset: 20, // Hover zamanı hissələrin bir qədər ayrılması
                borderRadius: 10, // Dilimlərin künclərinin yumru olması
                spacing: 5, // Dilimlər arasındakı boşluq
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    font: {
                        size: 14,
                        weight: 'bold',
                    },
                },
            },
            title: {
                display: true,
                text: title || 'Qrafik',
                font: {
                    size: 18,
                },
            },
            tooltip: {
                enabled: true,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleFont: { size: 16 },
                bodyFont: { size: 14 },
            },
        },
        cutout: '70%', // Halqanın qalınlığı
        animation: {
            animateRotate: true, // Animasiya ilə fırlanma
            animateScale: true, // Animasiya ilə ölçülərin dəyişməsi
        },
    };

    // Mərkəzdə əlavə məlumat üçün funksiya
    const centerTextPlugin = {
        id: 'centerText',
        beforeDraw: (chart) => {
            const { ctx, chartArea } = chart;
            if (!chartArea) return;

            const centerX = (chartArea.left + chartArea.right) / 2;
            const centerY = (chartArea.top + chartArea.bottom) / 2;

            ctx.save();
            ctx.font = 'bold 20px Arial';
            ctx.fillStyle = 'black';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('Satışlar', centerX, centerY - 10);
            ctx.font = '16px Arial';
            ctx.fillText(
                dataPoints.reduce((a, b) => a + b, 0) + ' ₼',
                centerX,
                centerY + 15
            );
            ctx.restore();
        },
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-5 shadow-md rounded-md table-auto w-full border border-gray-200 overflow-hidden">
                <div className="w-[800px] mx-auto"> {/* mx-auto ilə mərkəzə yerləşdirin */}
                    <Doughnut
                        data={data}
                        options={options}
                        plugins={[centerTextPlugin]} // Mərkəzdə məlumat üçün plugin
                    />
                </div>
            </div>
        </div>
    );
};

export default ChartComponent;
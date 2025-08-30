const API_BASE_URL = 'http://localhost:5000'; // Adjust this to match your backend URL

export async function sendDataToBackend(data: string): Promise<any> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/process`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error sending data to backend:', error);
        throw error;
    }
}
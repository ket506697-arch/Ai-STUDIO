export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    if (url.pathname === '/api/generate' && request.method === 'POST') {
      try {
        const data = await request.json();
        return new Response(JSON.stringify({
          success: true,
          message: 'Запрос успешно обработан бэкендом!',
          episodeData: {
            title: data.title || 'Без названия',
            episode: data.episode || 'Серия 1',
            hasImage: !!data.characterImage
          }
        }), {
          headers: { 'Content-Type': 'application/json; charset=utf-8' }
        });
      } catch (err) {
        return new Response(JSON.stringify({
          success: false,
          error: 'Ошибка чтения данных: ' + err.message
        }), {
          status: 400,
          headers: { 'Content-Type': 'application/json; charset=utf-8' }
        });
      }
    }

    return env.ASSETS.fetch(request);
  }
};

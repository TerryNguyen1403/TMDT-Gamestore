import { Card, Table, Form, Button, Modal } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminProducts = ({
  totalGames,
  games = [],
  platforms = [],
  genres = [],
  createGame,
  updateGame,
  deleteGame,
  fetchTotalGames,
  loadingAdmin,
}) => {
  const navigate = useNavigate();
  const [queryGame, setQueryGame] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingGameId, setEditingGameId] = useState(null);
  const [formData, setFormData] = useState({
    gameName: "",
    platform: [],
    genres: [],
    price: "",
    discount: 0,
    description: "",
    image: "",
    isFeatured: false,
    isNewGame: false,
  });
  const [createLoading, setCreateLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [createError, setCreateError] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(null);

  const filteredGames = useMemo(() => {
    const q = queryGame.trim().toLowerCase();
    if (!q) return games;
    return games.filter((game) =>
      [
        game.gameName,
        ...(game.genres?.map((g) => g.genreName) || []),
      ].some((v) =>
        String(v || "")
          .toLowerCase()
          .includes(q)
      )
    );
  }, [games, queryGame]);

  const handleCreateGameChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleEditGame = (game) => {
    setEditingGameId(game._id);
    setFormData({
      gameName: game.gameName,
      platform: game.platform?.map((p) => p._id || p) || [],
      genres: game.genres?.map((g) => g._id || g) || [],
      price: game.price,
      discount: game.discount || 0,
      description: game.description,
      image: game.image,
      isFeatured: game.isFeatured || false,
      isNewGame: game.isNewGame || false,
    });
    setShowEditModal(true);
  };

  const handleDeleteGame = async (gameId) => {
    if (window.confirm("Bạn có chắc chắn muốn xoá game này?")) {
      setDeleteLoading(gameId);
      try {
        await deleteGame(gameId);
        await fetchTotalGames();
      } catch (error) {
        alert("Lỗi khi xoá game: " + (error.response?.data?.message || error.message));
      } finally {
        setDeleteLoading(null);
      }
    }
  };

  const handleCreateGame = async (e) => {
    e.preventDefault();
    setCreateLoading(true);
    setCreateError("");

    try {
      if (!formData.gameName || !formData.price || !formData.description || !formData.image) {
        setCreateError("Vui lòng điền đầy đủ thông tin: Tên game, Giá, Mô tả, Ảnh");
        setCreateLoading(false);
        return;
      }

      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        discount: parseFloat(formData.discount) || 0,
        platform: formData.platform.length > 0 ? formData.platform : [],
        genres: formData.genres.length > 0 ? formData.genres : [],
      };

      await createGame(payload);
      setFormData({
        gameName: "",
        platform: [],
        genres: [],
        price: "",
        discount: 0,
        description: "",
        image: "",
        isFeatured: false,
        isNewGame: false,
      });
      setShowCreateModal(false);
      await fetchTotalGames();
    } catch (error) {
      setCreateError(error.response?.data?.message || error.message || "Lỗi khi tạo game");
    } finally {
      setCreateLoading(false);
    }
  };

  const handleSubmitEditGame = async (e) => {
    e.preventDefault();
    setEditLoading(true);
    setCreateError("");

    try {
      if (!formData.gameName || !formData.price || !formData.description || !formData.image) {
        setCreateError("Vui lòng điền đầy đủ thông tin: Tên game, Giá, Mô tả, Ảnh");
        setEditLoading(false);
        return;
      }

      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        discount: parseFloat(formData.discount) || 0,
        platform: formData.platform.length > 0 ? formData.platform : [],
        genres: formData.genres.length > 0 ? formData.genres : [],
      };

      await updateGame(editingGameId, payload);
      setShowEditModal(false);
      setEditingGameId(null);
      setFormData({
        gameName: "",
        platform: [],
        genres: [],
        price: "",
        discount: 0,
        description: "",
        image: "",
        isFeatured: false,
        isNewGame: false,
      });
      await fetchTotalGames();
    } catch (error) {
      setCreateError(error.response?.data?.message || error.message || "Lỗi khi cập nhật game");
    } finally {
      setEditLoading(false);
    }
  };

  return (
    <>
      <Card className="shadow-sm border-0 p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold mb-0">Quản lý sản phẩm</h4>
          <Button
            variant="success"
            onClick={() => {
              setFormData({
                gameName: "",
                platform: [],
                genres: [],
                price: "",
                discount: 0,
                description: "",
                image: "",
                isFeatured: false,
                isNewGame: false,
              });
              setShowCreateModal(true);
            }}
          >
            + Thêm game mới
          </Button>
        </div>

        <div className="mb-3">
          <div className="input-group">
            <span className="input-group-text">
              <Search />
            </span>
            <Form.Control
              type="text"
              placeholder="Tìm kiếm theo tên hoặc danh mục..."
              value={queryGame}
              onChange={(e) => setQueryGame(e.target.value)}
            />
          </div>
        </div>

        <Table responsive hover>
          <thead className="table-light">
            <tr>
              <th>Tên sản phẩm</th>
              <th>Giá</th>
              <th>Danh mục</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredGames.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center text-muted">
                  (Chưa có dữ liệu)
                </td>
              </tr>
            ) : (
              filteredGames.map((game) => (
                <tr key={game._id}>
                  <td>{game.gameName}</td>
                  <td>{game.price?.toLocaleString("vi-VN")} VNĐ</td>
                  <td>
                    {game.genres?.map((g) => g.genreName).join(", ") ||
                      "N/A"}
                  </td>
                  <td>
                    <Button
                      size="sm"
                      variant="warning"
                      style={{ marginRight: "5px" }}
                      onClick={() => handleEditGame(game)}
                    >
                      Sửa
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      disabled={deleteLoading === game._id}
                      onClick={() => handleDeleteGame(game._id)}
                    >
                      {deleteLoading === game._id ? "Đang xoá..." : "Xoá"}
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Card>

      {/* Modal Create Game */}
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Thêm game mới</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {createError && (
            <div className="alert alert-danger" role="alert">
              {createError}
            </div>
          )}
          <Form onSubmit={handleCreateGame}>
            <Form.Group className="mb-3">
              <Form.Label>Tên game *</Form.Label>
              <Form.Control
                type="text"
                name="gameName"
                placeholder="Nhập tên game"
                value={formData.gameName}
                onChange={handleCreateGameChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Giá (VNĐ) *</Form.Label>
              <Form.Control
                type="number"
                name="price"
                placeholder="Nhập giá"
                value={formData.price}
                onChange={handleCreateGameChange}
                min="0"
                step="1000"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Giảm giá (%)</Form.Label>
              <Form.Control
                type="number"
                name="discount"
                placeholder="Nhập % giảm giá (mặc định 0)"
                value={formData.discount}
                onChange={handleCreateGameChange}
                min="0"
                max="100"
                step="1"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mô tả *</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                placeholder="Nhập mô tả game"
                value={formData.description}
                onChange={handleCreateGameChange}
                rows={3}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Link ảnh *</Form.Label>
              <Form.Control
                type="url"
                name="image"
                placeholder="Nhập URL ảnh"
                value={formData.image}
                onChange={handleCreateGameChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Nền tảng</Form.Label>
              <div className="d-flex flex-wrap gap-3">
                {platforms.map((p) => (
                  <Form.Check
                    key={p._id}
                    type="checkbox"
                    id={`platform-${p._id}`}
                    label={p.platformName}
                    checked={formData.platform.includes(p._id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData((prev) => ({
                          ...prev,
                          platform: [...prev.platform, p._id],
                        }));
                      } else {
                        setFormData((prev) => ({
                          ...prev,
                          platform: prev.platform.filter((id) => id !== p._id),
                        }));
                      }
                    }}
                  />
                ))}
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Thể loại</Form.Label>
              <div className="d-flex flex-wrap gap-3">
                {genres.map((g) => (
                  <Form.Check
                    key={g._id}
                    type="checkbox"
                    id={`genre-${g._id}`}
                    label={g.genreName}
                    checked={formData.genres.includes(g._id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData((prev) => ({
                          ...prev,
                          genres: [...prev.genres, g._id],
                        }));
                      } else {
                        setFormData((prev) => ({
                          ...prev,
                          genres: prev.genres.filter((id) => id !== g._id),
                        }));
                      }
                    }}
                  />
                ))}
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                name="isFeatured"
                label="Đánh dấu là sản phẩm nổi bật"
                checked={formData.isFeatured}
                onChange={handleCreateGameChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                name="isNewGame"
                label="Đánh dấu là game mới"
                checked={formData.isNewGame}
                onChange={handleCreateGameChange}
              />
            </Form.Group>

            <div className="d-flex gap-2">
              <Button
                variant="primary"
                type="submit"
                disabled={createLoading || loadingAdmin}
              >
                {createLoading ? "Đang tạo..." : "Tạo game"}
              </Button>
              <Button
                variant="secondary"
                onClick={() => setShowCreateModal(false)}
              >
                Hủy
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal Edit Game */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Sửa game</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {createError && (
            <div className="alert alert-danger" role="alert">
              {createError}
            </div>
          )}
          <Form onSubmit={handleSubmitEditGame}>
            <Form.Group className="mb-3">
              <Form.Label>Tên game *</Form.Label>
              <Form.Control
                type="text"
                name="gameName"
                placeholder="Nhập tên game"
                value={formData.gameName}
                onChange={handleCreateGameChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Giá (VNĐ) *</Form.Label>
              <Form.Control
                type="number"
                name="price"
                placeholder="Nhập giá"
                value={formData.price}
                onChange={handleCreateGameChange}
                min="0"
                step="1000"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Giảm giá (%)</Form.Label>
              <Form.Control
                type="number"
                name="discount"
                placeholder="Nhập % giảm giá (mặc định 0)"
                value={formData.discount}
                onChange={handleCreateGameChange}
                min="0"
                max="100"
                step="1"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mô tả *</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                placeholder="Nhập mô tả game"
                value={formData.description}
                onChange={handleCreateGameChange}
                rows={3}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Link ảnh *</Form.Label>
              <Form.Control
                type="url"
                name="image"
                placeholder="Nhập URL ảnh"
                value={formData.image}
                onChange={handleCreateGameChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Nền tảng</Form.Label>
              <div className="d-flex flex-wrap gap-3">
                {platforms.map((p) => (
                  <Form.Check
                    key={p._id}
                    type="checkbox"
                    id={`edit-platform-${p._id}`}
                    label={p.platformName}
                    checked={formData.platform.includes(p._id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData((prev) => ({
                          ...prev,
                          platform: [...prev.platform, p._id],
                        }));
                      } else {
                        setFormData((prev) => ({
                          ...prev,
                          platform: prev.platform.filter((id) => id !== p._id),
                        }));
                      }
                    }}
                  />
                ))}
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Thể loại</Form.Label>
              <div className="d-flex flex-wrap gap-3">
                {genres.map((g) => (
                  <Form.Check
                    key={g._id}
                    type="checkbox"
                    id={`edit-genre-${g._id}`}
                    label={g.genreName}
                    checked={formData.genres.includes(g._id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData((prev) => ({
                          ...prev,
                          genres: [...prev.genres, g._id],
                        }));
                      } else {
                        setFormData((prev) => ({
                          ...prev,
                          genres: prev.genres.filter((id) => id !== g._id),
                        }));
                      }
                    }}
                  />
                ))}
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                name="isFeatured"
                label="Đánh dấu là sản phẩm nổi bật"
                checked={formData.isFeatured}
                onChange={handleCreateGameChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                name="isNewGame"
                label="Đánh dấu là game mới"
                checked={formData.isNewGame}
                onChange={handleCreateGameChange}
              />
            </Form.Group>

            <div className="d-flex gap-2">
              <Button
                variant="primary"
                type="submit"
                disabled={editLoading || loadingAdmin}
              >
                {editLoading ? "Đang cập nhật..." : "Lưu thay đổi"}
              </Button>
              <Button
                variant="secondary"
                onClick={() => setShowEditModal(false)}
              >
                Hủy
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AdminProducts;
